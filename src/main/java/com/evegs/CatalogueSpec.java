package com.evegs;

import org.springframework.data.jpa.domain.Specification;

public class CatalogueSpec {
    public static final Specification<Article> referenceEquals(String reference) {
		return (root, query, builder) -> reference == null 
        ? null
        : builder.equal(root.get(Article_.reference), reference);
    }
}
