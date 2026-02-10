package com.spencer.regextodfa.model;

import java.util.List;
import java.util.Set;

public class DfaResponse {
    private String regex;
    private String alphabet;
    private String startState;
    private Set<String> acceptStates;
    private List<String> states;
    private List<DfaTransition> transitions;
    private List<DfaNode> nodes;
    private List<DfaEdge> edges;
    private boolean minimized;
    private String dot;

    public DfaResponse(String regex,
                       String alphabet,
                       String startState,
                       Set<String> acceptStates,
                       List<String> states,
                       List<DfaTransition> transitions,
                       List<DfaNode> nodes,
                       List<DfaEdge> edges,
                       boolean minimized,
                       String dot) {
        this.regex = regex;
        this.alphabet = alphabet;
        this.startState = startState;
        this.acceptStates = acceptStates;
        this.states = states;
        this.transitions = transitions;
        this.nodes = nodes;
        this.edges = edges;
        this.minimized = minimized;
        this.dot = dot;
    }

    public String getRegex() {
        return regex;
    }

    public String getAlphabet() {
        return alphabet;
    }

    public String getStartState() {
        return startState;
    }

    public Set<String> getAcceptStates() {
        return acceptStates;
    }

    public List<String> getStates() {
        return states;
    }

    public List<DfaTransition> getTransitions() {
        return transitions;
    }

    public List<DfaNode> getNodes() {
        return nodes;
    }

    public List<DfaEdge> getEdges() {
        return edges;
    }

    public boolean isMinimized() {
        return minimized;
    }

    public String getDot() {
        return dot;
    }
}
