package com.evegs;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Slf4j
public class EvegsApplication {

    public static void main(String[] args) {
        SpringApplication.run(EvegsApplication.class, args);
    }

//	@EventListener({ ServletWebServerInitializedEvent.class })
//	void applicationReadyEvent(ServletWebServerInitializedEvent event) {
//		log.info("Application started ... launching browser now");
//		String url = String.format("http://localhost:%s", event.getWebServer().getPort());
//		try {
//			openBrowser(new URI(url));
//		} catch (IOException | URISyntaxException e) {
//			log.warn("Failed to open browser. Please open your browser at this location: " + url);
//		}
//	}
//
//	private static void openBrowser(URI url) throws IOException, URISyntaxException {
//		if (Desktop.isDesktopSupported()) {
//			Desktop desktop = Desktop.getDesktop();
//			desktop.browse(url);
//		} else {
//			Runtime runtime = Runtime.getRuntime();
//			runtime.exec("xdg-open " + url);
//		}
//	}
}
