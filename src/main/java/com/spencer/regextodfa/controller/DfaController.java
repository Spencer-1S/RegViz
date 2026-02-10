package com.spencer.regextodfa.controller;

import com.spencer.regextodfa.model.DfaRequest;
import com.spencer.regextodfa.model.DfaResponse;
import com.spencer.regextodfa.service.RegexToDfaService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class DfaController {

    private final RegexToDfaService regexToDfaService;

    public DfaController(RegexToDfaService regexToDfaService) {
        this.regexToDfaService = regexToDfaService;
    }

    @GetMapping("/")
    public String healthCheck() {
        return "RegViz API is running!";
    }

    @PostMapping(path = "/dfa", consumes = MediaType.APPLICATION_JSON_VALUE)
    public DfaResponse buildDfa(@Valid @RequestBody DfaRequest request) {
        return regexToDfaService.buildDfa(request);
    }

    @GetMapping("/health")
    public String health() {
        return "ok";
    }
}
