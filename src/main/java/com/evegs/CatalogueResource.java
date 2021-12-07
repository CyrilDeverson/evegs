package com.evegs;

import com.querydsl.core.BooleanBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/articles")
public class CatalogueResource {

    private final CatalogueRepository articles;

    public CatalogueResource(CatalogueRepository articles) {
        this.articles = articles;
    }

    @GetMapping
    Page<Article> list(String reference, String libelle, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();
        referenceContains(builder, reference);
        libelleContains(builder, libelle);
        return articles.findAll(builder, pageable);
    }

    private void referenceContains(BooleanBuilder builder, String reference) {
        Optional.ofNullable(reference).map(QArticle.article.reference::containsIgnoreCase).map(builder::and);
    }

    private void libelleContains(BooleanBuilder builder, String libelle) {
        Optional.ofNullable(libelle).map(QArticle.article.libelle::containsIgnoreCase).map(builder::and);
    }

    @PostMapping
    ResponseEntity<Object> add(@Valid @RequestBody Article article) {
        articles.save(article);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(article.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{id}")
    void update(@PathVariable UUID id, @Valid Article article) {
        delete(id);
        article.setId(id);
        add(article);
    }

    @GetMapping("/{id}")
    ResponseEntity<Article> get(@PathVariable UUID id) {
        return articles.findById(id)
                .map(article -> ResponseEntity.ok(article))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable UUID id) {
        articles.deleteById(id);
    }
}
