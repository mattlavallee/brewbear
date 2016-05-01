-- Table: "user"

-- DROP TABLE "user";

CREATE TABLE "user"
(
  id character varying(250) NOT NULL,
  name character varying(500),
  email character varying(250),
  CONSTRAINT pk_user PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "user"
  OWNER TO czarzaunirujle;


-- Table: units

-- DROP TABLE units;

CREATE TABLE units
(
  id integer NOT NULL DEFAULT nextval('"Units_id_seq"'::regclass),
  unit character varying(20) NOT NULL,
  type character varying(10) NOT NULL,
  CONSTRAINT "PK_UNIT" PRIMARY KEY (id),
  CONSTRAINT "UQ_UNIT" UNIQUE (unit, type)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE units
  OWNER TO czarzaunirujle;


-- Table: "barType"

-- DROP TABLE "barType";

CREATE TABLE "barType"
(
  id serial NOT NULL,
  type character varying(50) NOT NULL,
  active boolean NOT NULL DEFAULT true,
  CONSTRAINT "PK_BARTYPE" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "barType"
  OWNER TO czarzaunirujle;


-- Table: beer

-- DROP TABLE beer;

CREATE TABLE beer
(
  id serial NOT NULL,
  "userId" character varying(250) NOT NULL,
  name character varying(500) NOT NULL,
  style character varying(200),
  abv double precision,
  "originalGravity" double precision,
  "finalGravity" double precision,
  notes text,
  "dateAdded" date NOT NULL DEFAULT ('now'::text)::date,
  active boolean NOT NULL DEFAULT true,
  srm double precision NOT NULL,
  CONSTRAINT "PK_BEER" PRIMARY KEY (id),
  CONSTRAINT "FK_BEER_USER" FOREIGN KEY ("userId")
      REFERENCES "user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE beer
  OWNER TO czarzaunirujle;

-- Index: "FKI_BEER_USER"

-- DROP INDEX "FKI_BEER_USER";

CREATE INDEX "FKI_BEER_USER"
  ON beer
  USING btree
  ("userId" COLLATE pg_catalog."default");





-- Table: bar

-- DROP TABLE bar;

CREATE TABLE bar
(
  id serial NOT NULL,
  "typeId" serial NOT NULL,
  name character varying(250),
  active boolean NOT NULL DEFAULT true,
  "userId" character varying(250) NOT NULL,
  CONSTRAINT "PK_BAR" PRIMARY KEY (id),
  CONSTRAINT "FK_BAR_BARTYPE" FOREIGN KEY ("typeId")
      REFERENCES "barType" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "FK_BAR_USER" FOREIGN KEY ("userId")
      REFERENCES "user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE bar
  OWNER TO czarzaunirujle;

-- Index: "FKI_BAR_USER"

-- DROP INDEX "FKI_BAR_USER";

CREATE INDEX "FKI_BAR_USER"
  ON bar
  USING btree
  ("userId" COLLATE pg_catalog."default");




-- Table: recipe

-- DROP TABLE recipe;

CREATE TABLE recipe
(
  id serial NOT NULL,
  "beerId" serial NOT NULL,
  recipe bytea,
  active boolean NOT NULL DEFAULT true,
  CONSTRAINT "PK_RECIPE" PRIMARY KEY (id),
  CONSTRAINT "FK_RECIPE_BEER" FOREIGN KEY ("beerId")
      REFERENCES beer (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE recipe
  OWNER TO czarzaunirujle;


-- Table: "barHistory"

-- DROP TABLE "barHistory";

CREATE TABLE "barHistory"
(
  id serial NOT NULL,
  "userId" character varying(250) NOT NULL,
  "barId" serial NOT NULL,
  "beerId" serial NOT NULL,
  volume double precision NOT NULL,
  "unitId" serial NOT NULL,
  date date NOT NULL DEFAULT ('now'::text)::date,
  active boolean NOT NULL DEFAULT true,
  CONSTRAINT "PK_BARHIST" PRIMARY KEY (id),
  CONSTRAINT "FK_BARHIST_BAR" FOREIGN KEY ("barId")
      REFERENCES bar (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "FK_BARHIST_BEER" FOREIGN KEY ("beerId")
      REFERENCES beer (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "FK_BARHIST_UNIT" FOREIGN KEY ("unitId")
      REFERENCES units (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "FK_BARHIST_USER" FOREIGN KEY ("userId")
      REFERENCES "user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "barHistory"
  OWNER TO czarzaunirujle;



-- Table: "drinkHistory"

-- DROP TABLE "drinkHistory";

CREATE TABLE "drinkHistory"
(
  id serial NOT NULL,
  date date NOT NULL DEFAULT ('now'::text)::date,
  "numUnits" double precision NOT NULL,
  "barId" integer NOT NULL,
  CONSTRAINT "PK_DRINKHIST" PRIMARY KEY (id),
  CONSTRAINT "FK_History_Bar" FOREIGN KEY ("barId")
      REFERENCES "barHistory" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "drinkHistory"
  OWNER TO czarzaunirujle;

-- Index: "FKI_History_Bar"

-- DROP INDEX "FKI_History_Bar";

CREATE INDEX "FKI_History_Bar"
  ON "drinkHistory"
  USING btree
  ("barId");


