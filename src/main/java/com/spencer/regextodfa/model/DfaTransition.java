package com.spencer.regextodfa.model;

public class DfaTransition {
    private String from;
    private String to;
    private String label;

    public DfaTransition(String from, String to, String label) {
        this.from = from;
        this.to = to;
        this.label = label;
    }

    public String getFrom() {
        return from;
    }

    public String getTo() {
        return to;
    }

    public String getLabel() {
        return label;
    }
}
