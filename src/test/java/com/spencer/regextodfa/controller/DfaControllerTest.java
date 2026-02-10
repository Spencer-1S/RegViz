package com.spencer.regextodfa.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spencer.regextodfa.model.DfaRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class DfaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void returnsDfaResponse() throws Exception {
        DfaRequest request = new DfaRequest();
        request.setRegex("a*");

        mockMvc.perform(post("/api/dfa")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.regex").value("a*"))
                .andExpect(jsonPath("$.startState").value("q0"))
                .andExpect(jsonPath("$.dot").exists());
    }
}
