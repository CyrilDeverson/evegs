delete from article where id='1';

insert into article (id, reference, libelle) values (hibernate_sequence.NEXTVAL, 'legrand-ref2', 'Interrupteur');
