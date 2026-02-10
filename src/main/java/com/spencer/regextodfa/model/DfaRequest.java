package com.spencer.regextodfa.model;

import jakarta.validation.constraints.NotBlank;

public class DfaRequest {
    @NotBlank(message = "Regex must not be blank")
    private String regex;
    private String alphabet;
    private boolean minimize = true;

    public String getRegex() {
        return regex;
    }

    public void setRegex(String regex) {
        this.regex = regex;
    }

    public String getAlphabet() {
        return alphabet;
    }

    public void setAlphabet(String alphabet) {
        this.alphabet = alphabet;
    }

    public boolean isMinimize() {
        return minimize;
    }

    public void setMinimize(boolean minimize) {
        this.minimize = minimize;
    }
}
