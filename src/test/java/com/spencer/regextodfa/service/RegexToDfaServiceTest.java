package com.spencer.regextodfa.service;

import com.spencer.regextodfa.model.DfaRequest;
import com.spencer.regextodfa.model.DfaResponse;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RegexToDfaServiceTest {

    private final RegexToDfaService service = new RegexToDfaService();

    @Test
    void buildsDfaForSimpleRegex() {
        DfaRequest request = new DfaRequest();
        request.setRegex("(ab)*c");
        request.setMinimize(true);

        DfaResponse response = service.buildDfa(request);

        assertEquals("(ab)*c", response.getRegex());
        assertEquals("q0", response.getStartState());
        assertFalse(response.getAcceptStates().isEmpty());
        assertFalse(response.getTransitions().isEmpty());
        assertFalse(response.getNodes().isEmpty());
        assertNotNull(response.getDot());
        assertTrue(response.getDot().contains("digraph"));
    }

    @Test
    void rejectsBlankRegex() {
        DfaRequest request = new DfaRequest();
        request.setRegex("   ");
        assertThrows(IllegalArgumentException.class, () -> service.buildDfa(request));
    }

    @Test
    void rejectsInvalidRegex() {
        DfaRequest request = new DfaRequest();
        request.setRegex("(ab");
        assertThrows(IllegalArgumentException.class, () -> service.buildDfa(request));
    }
}

