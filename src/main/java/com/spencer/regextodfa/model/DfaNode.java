package com.spencer.regextodfa.model;

public class DfaNode {
    private String id;
    private String label;
    private boolean start;
    private boolean accept;

    public DfaNode(String id, String label, boolean start, boolean accept) {
        this.id = id;
        this.label = label;
        this.start = start;
        this.accept = accept;
    }

    public String getId() {
        return id;
    }

    public String getLabel() {
        return label;
    }

    public boolean isStart() {
        return start;
    }

    public boolean isAccept() {
        return accept;
    }
}
