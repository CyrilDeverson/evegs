package com.evegs;

import java.awt.Desktop;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@Slf4j
public class EvegsApplication {

	public static void main(String[] args) {
		SpringApplication.run(EvegsApplication.class, args);
	}
  
	@EventListener({ ApplicationReadyEvent.class })
	void applicationReadyEvent() {
		log.info("Application started ... launching browser now");
		String url = "http://localhost:1234";
		try {
			openBrowser(new URI(url));
		} catch (IOException | URISyntaxException e) {
			log.warn("Failed to open browser. Please open your browser at this location: " + url);
		}
	}

	private static void openBrowser(URI url) throws IOException, URISyntaxException {
		if (Desktop.isDesktopSupported()) {
			Desktop desktop = Desktop.getDesktop();
			desktop.browse(url);
		} else {
			Runtime runtime = Runtime.getRuntime();
			runtime.exec("xdg-open " + url);
		}
	}
}
