package com.evegs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CatalogueRepository extends JpaRepository<Article, Long>, JpaSpecificationExecutor<Article> {
    void deleteByReference(String reference);
}
