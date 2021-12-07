package com.evegs;

import java.util.UUID;

import com.querydsl.core.annotations.QueryEntity;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@QueryEntity
@Repository
public interface CatalogueRepository extends QuerydslPredicateExecutor<Article>, PagingAndSortingRepository<Article, UUID> {
}
