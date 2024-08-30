sistema vídeo locadora

cliente aluga filme
cliente entrega filme
calcular custo de aluguel
calcular data da entrega do filme dependendo do dia da semana alugado
verificar se filme está disponivel para alugar se não quando estará

Entities

- movie
  -- title
  -- quantity
  -- available
  -- price_rental

- customer
  -- name
  -- document

- rent
  -- customer
  -- movies
  -- total
  -- rent_date
  -- deliver_date

useCases
-- getQuantityMovieRented
-- getMovieRentedByCustomer
-- customerRentMovie
-- customerDeliverMovie
