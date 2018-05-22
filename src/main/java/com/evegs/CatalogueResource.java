package com.evegs;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/articles")
public class CatalogueResource {

	@Autowired
	private CatalogueRepository articles;

	@GetMapping("/")
	Page<Article> list(Pageable pageable) {
		return articles.findAll(pageable);
	}
	
	@PostMapping("/")
	ResponseEntity<Object> add(@Valid Article article) {
		articles.save(article);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(article.getId())
				.toUri();

		return ResponseEntity.created(location).build();
	}

	@PutMapping("/{id}")
	void update(@PathVariable Long id, @Valid Article article) {
		delete(id);
		article.setId(id);
		add(article);
	}
	
	@GetMapping("/{id}")
	ResponseEntity<Article> get(@PathVariable Long id) {
		return articles.findById(id)
				.map(article -> ResponseEntity.ok(article))
				.orElse(ResponseEntity.notFound().build());
	}
	
	@DeleteMapping("/{id}")
	void delete(@PathVariable Long id) {
		articles.deleteById(id);
	}
}
