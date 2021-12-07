package com.evegs;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Data;

@Data
@Entity
@Table(uniqueConstraints = {@UniqueConstraint(name = "UK_ARTICLE_REFERENCE", columnNames = {"reference"})})
public class Article {
	@Id
	@GeneratedValue
	private Long id;
	
	@Column(nullable = false)
	private String reference;

	@Column(nullable = false)
	private String libelle;
}
