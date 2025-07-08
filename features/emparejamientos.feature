Feature: Emparejamientos automáticos

  Scenario: Generar emparejamientos para un torneo
    Given que el administrador ha creado un torneo con varios equipos registrados
    When selecciona el tipo de formato "eliminación directa"
    And presiona el botón de generar emparejamientos
    Then el sistema debe generar los enfrentamientos según los criterios
    And mostrar la lista de partidos programados

  Scenario: Generación fallida sin equipos inscritos
    Given que no hay equipos inscritos en el torneo
    When el administrador intenta generar emparejamientos
    Then el sistema debe mostrar un mensaje de error
    And no debe generar ningún enfrentamiento
