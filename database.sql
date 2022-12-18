CREATE TABLE tasks (
    "id" serial PRIMARY KEY,
    "task" varchar(256) NOT NULL,
    "complete" BOOLEAN
);

INSERT INTO "tasks"
  ("task", "complete")
  VALUES
  ('Finish To Do App!', 'false')
  