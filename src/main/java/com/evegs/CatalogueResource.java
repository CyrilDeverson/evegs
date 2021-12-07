package com.evegs;

import static com.evegs.CatalogueSpec.referenceEquals;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/articles")
public class CatalogueResource {

	@Autowired
	private CatalogueRepository articles;

	@GetMapping
	Page<Article> list(Pageable pageable) {
		log.info("Lister les articles...");
		return articles.findAll(pageable);
	}
	
	@PostMapping
	ResponseEntity<Article> add(@Valid @RequestBody Article article) {
		log.info("Ajouter un article...");
		articles.save(article);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(article.getId())
				.toUri();

		return ResponseEntity.created(location).body(article);
	}

	@PutMapping("/{id}")
	void update(@PathVariable Long id, @Valid @RequestBody Article article) {
		log.info("Mettre à jour un article...");
		articles.deleteById(id);
		article.setId(id);
		add(article);
	}
	
	@GetMapping("/{id}")
	ResponseEntity<Article> get(@PathVariable Long id) {
		log.info("Confulter un article...");
		return articles.findById(id)
				.map(article -> ResponseEntity.ok(article))
				.orElse(ResponseEntity.notFound().build());
	}
	
	@DeleteMapping("/{reference}")
	void delete(@PathVariable String reference) {
		log.info("Supprimer un article...");
		articles.findOne(Specification.where(referenceEquals(reference))).ifPresent(articles::delete);
		articles.deleteByReference(reference);
	}
}
