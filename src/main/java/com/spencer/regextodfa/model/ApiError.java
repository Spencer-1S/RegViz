package com.spencer.regextodfa.model;

import java.time.Instant;
import java.util.List;

public class ApiError {
    private final Instant timestamp = Instant.now();
    private final int status;
    private final String message;
    private final List<String> errors;

    public ApiError(int status, String message, List<String> errors) {
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public List<String> getErrors() {
        return errors;
    }
}
