Feature: Registro de usuarios

  Scenario: Registro exitoso
    Given que un visitante accede a la página de registro
    When ingresa su nombre, correo electrónico, fecha de nacimiento y contraseña válidos y presiona el botón de registro
    Then el sistema debe crear su cuenta
    And mostrar un mensaje de éxito

  Scenario: Registro con correo ya existente
    Given ya existe un usuario con el correo "usuario@ejemplo.com"
    When otro visitante intenta registrarse con ese mismo correo
    Then el sistema debe rechazar el registro
    And mostrar un mensaje de error indicando que el correo ya está registrado