package com.spencer.regextodfa.service;

import com.spencer.regextodfa.model.DfaEdge;
import com.spencer.regextodfa.model.DfaNode;
import com.spencer.regextodfa.model.DfaRequest;
import com.spencer.regextodfa.model.DfaResponse;
import com.spencer.regextodfa.model.DfaTransition;
import dk.brics.automaton.Automaton;
import dk.brics.automaton.RegExp;
import dk.brics.automaton.State;
import dk.brics.automaton.Transition;
import org.springframework.stereotype.Service;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Queue;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RegexToDfaService {

    public DfaResponse buildDfa(DfaRequest request) {
        String regex = Objects.requireNonNullElse(request.getRegex(), "").trim();
        if (regex.isBlank()) {
            throw new IllegalArgumentException("Regex must not be blank");
        }

        // dk.brics.automaton treats ^ and $ as literals, but they are typically anchors.
        // Since the automaton matches the full string by default, we strip them.
        String processedRegex = regex;
        if (processedRegex.startsWith("^")) {
            processedRegex = processedRegex.substring(1);
        }
        if (processedRegex.endsWith("$") && !processedRegex.endsWith("\\$")) {
            processedRegex = processedRegex.substring(0, processedRegex.length() - 1);
        }

        try {
            Automaton automaton = new RegExp(processedRegex, RegExp.ALL).toAutomaton();
            automaton.determinize();
            if (request.isMinimize()) {
                automaton.minimize();
            }


            Map<State, String> stateIds = indexStatesBreadthFirst(automaton);
            List<String> states = new ArrayList<>(stateIds.values());
            String startId = stateIds.get(automaton.getInitialState());
            Set<String> acceptStates = stateIds.entrySet().stream()
                    .filter(entry -> entry.getKey().isAccept())
                    .map(Map.Entry::getValue)
                    .collect(Collectors.toCollection(LinkedHashSet::new));

            Map<String, Map<String, List<String>>> groupedLabels = groupTransitions(stateIds);
            List<DfaTransition> transitions = new ArrayList<>();
            List<DfaEdge> edges = new ArrayList<>();
            int edgeCounter = 0;
            for (Map.Entry<String, Map<String, List<String>>> fromEntry : groupedLabels.entrySet()) {
                for (Map.Entry<String, List<String>> toEntry : fromEntry.getValue().entrySet()) {
                    List<String> labels = toEntry.getValue();
                    labels.sort(String::compareTo);
                    String label = String.join("|", labels);
                    transitions.add(new DfaTransition(fromEntry.getKey(), toEntry.getKey(), label));
                    edges.add(new DfaEdge("e" + edgeCounter++, fromEntry.getKey(), toEntry.getKey(), label));
                }
            }

            List<DfaNode> nodes = states.stream()
                    .map(id -> new DfaNode(id, id, id.equals(startId), acceptStates.contains(id)))
                    .toList();

            return new DfaResponse(
                    regex,
                    request.getAlphabet(),
                    startId,
                    acceptStates,
                    states,
                    transitions,
                    nodes,
                    edges,
                    request.isMinimize(),
                    toDot(startId, acceptStates, transitions)
            );
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Invalid regular expression: " + ex.getMessage(), ex);
        }
    }

    private Map<State, String> indexStatesBreadthFirst(Automaton automaton) {
        Map<State, String> stateIds = new LinkedHashMap<>();
        Queue<State> queue = new ArrayDeque<>();
        State start = automaton.getInitialState();
        stateIds.put(start, "q0");
        queue.add(start);

        while (!queue.isEmpty()) {
            State current = queue.poll();
            for (Transition transition : current.getTransitions()) {
                State target = transition.getDest();
                if (!stateIds.containsKey(target)) {
                    stateIds.put(target, "q" + stateIds.size());
                    queue.add(target);
                }
            }
        }
        return stateIds;
    }

    private Map<String, Map<String, List<String>>> groupTransitions(Map<State, String> stateIds) {
        Map<String, Map<String, List<String>>> grouped = new LinkedHashMap<>();
        for (Map.Entry<State, String> entry : stateIds.entrySet()) {
            State fromState = entry.getKey();
            String fromId = entry.getValue();
            for (Transition transition : fromState.getTransitions()) {
                String toId = stateIds.get(transition.getDest());
                String label = formatRange(transition.getMin(), transition.getMax());
                grouped.computeIfAbsent(fromId, key -> new LinkedHashMap<>())
                        .computeIfAbsent(toId, key -> new ArrayList<>())
                        .add(label);
            }
        }
        return grouped;
    }

    private String formatRange(char min, char max) {
        if (min == max) {
            return printable(min);
        }
        if (min + 1 == max) {
            return printable(min) + "|" + printable(max);
        }
        return printable(min) + "-" + printable(max);
    }

    private String printable(char value) {
        return switch (value) {
            case '\n' -> "\\n";
            case '\r' -> "\\r";
            case '\t' -> "\\t";
            default -> Character.toString(value);
        };
    }

    private String toDot(String startState, Set<String> acceptStates, List<DfaTransition> transitions) {
        StringBuilder sb = new StringBuilder();
        sb.append("digraph DFA {\n");
        sb.append("  rankdir=LR;\n");
        sb.append("  node [shape=circle, style=solid, fontcolor=black, color=black];\n");
        sb.append("  edge [color=black, fontcolor=black];\n");
        sb.append("  __start [shape=point, label=\"\", color=black];\n");
        sb.append("  __start -> ").append(escape(startState)).append(";\n");
        for (String accept : acceptStates) {
            sb.append("  ").append(escape(accept)).append(" [shape=doublecircle, penwidth=2, color=black];\n");
        }
        for (DfaTransition t : transitions) {
            sb.append("  ")
                    .append(escape(t.getFrom()))
                    .append(" -> ")
                    .append(escape(t.getTo()))
                    .append(" [label=\"")
                    .append(escapeLabel(t.getLabel()))
                    .append("\"];\n");
        }
        sb.append("}\n");
        return sb.toString();
    }

    private String escape(String value) {
        return value.replace("\"", "\\\"");
    }

    private String escapeLabel(String value) {
        return value.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
