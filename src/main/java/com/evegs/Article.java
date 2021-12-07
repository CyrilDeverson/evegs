package com.evegs;

import java.util.UUID;

import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Document(collection = "articles")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Article {
	@Id
	@Builder.Default
	private UUID id = UUID.randomUUID();

	@NotBlank
	private String reference;

	@NotBlank
	private String libelle;
}
