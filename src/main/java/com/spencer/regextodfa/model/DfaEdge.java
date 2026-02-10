package com.spencer.regextodfa.model;

public class DfaEdge {
    private String id;
    private String source;
    private String target;
    private String label;

    public DfaEdge(String id, String source, String target, String label) {
        this.id = id;
        this.source = source;
        this.target = target;
        this.label = label;
    }

    public String getId() {
        return id;
    }

    public String getSource() {
        return source;
    }

    public String getTarget() {
        return target;
    }

    public String getLabel() {
        return label;
    }
}
