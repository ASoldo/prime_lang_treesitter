
module.exports = grammar({
  name: 'prime',

  extras: $ => [/[\s\t\n\r]+/],

  rules: {
    program: $ => seq('fn', 'main', '(', ')', field('body', $.block)),

    block: $ => seq('{', repeat($.statement), '}'),

    statement: $ => choice(
      $.let_statement,
      $.out_statement,
      $.expression_statement
    ),

    let_statement: $ => seq('let', 'int', field('name', $.identifier), '=', field('value', $.expression), ';'),

    out_statement: $ => seq('out', '(', field('argument', $.expression), ')', ';'),

    expression_statement: $ => seq($.expression, ';'),

    expression: $ =>
      choice(
        $.identifier,
        $.number,
        seq('(', $.expression, ')'),
        prec.left(
          seq(
            $.expression,
            choice('+', '-', '*', '/'),
            $.expression
          )
        )
      ),

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    number: $ => /[0-9]+/
  }
});
