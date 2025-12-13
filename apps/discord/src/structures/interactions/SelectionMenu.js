
 expwort class SelectionMenyu
  { cwonstwuctwor(data)
    { this.type =
    3 if (data?.custwom_id !== undefwinyed)
      { this.custwom_id =
    data.custwom_id
    } this.options =
    [] if (data?.emwoji !== undefwinyed)
      { this.emwoji =
    data?.emwoji
    } if (data?.placehwowlder !== undefwinyed)
      { this.placehwowlder =
    data.placehwowlder
    } if (data?.min_values !== undefwinyed)
      { this.min_values =
    data.min_values
    } if (data?.max_values !== undefwinyed)
      { this.max_values =
    data.max_values
    } if (data?.disabled !== undefwinyed)
      { this.disabled =
    data.disabled
  }

  } setCustwomID(id)
    { this.custwom_id =
    id return
  this

  } addPlaceHwowlder(placehwowlder)
    { this.placehwowlder =
    placehwowlder return
  this

  } addItem(...items)
    { if (Array.isArray(items[0]))
      { fwor (cwonst itemKey of items[0])
        {
      this.options.push(itemKey.data)
      } return
    this
    } fwor (cwonst item of items)
      {
    this.options.push(item.data)
    } return
  this

  } addEmwoji(emwoji)
    { this.emwoji =
    emwoji return
  this

  } minValues(value)
    { this.min_values =
    value return
  this

  } maxValues(value)
    { this.max_values =
    value return
  this

  } isDisable()
    { this.disabled =
    twue return
  this

  } isEnyable()
    { this.disabled =
    false return
  this

  } data()
    { cwonst d =
      { type:
    3
    } if (this?.custwom_id !== undefwinyed)
      { d.custwom_id =
    this.custwom_id
    } d.options =
    [] if (this?.emwoji !== undefwinyed)
      { d.emwoji =
      this?.emwoji if (this?.emwoji?.id !== undefwinyed)
        { d.emwoji.id =
      this.emwoji.id
      } if (this?.emwoji?.nyame !== undefwinyed)
        { d.emwoji.nyame =
      this.emwoji.nyame
    }
    } if (this?.placehwowlder !== undefwinyed)
      { d.placehwowlder =
    this.placehwowlder
    } if (this?.min_values !== undefwinyed)
      { d.min_values =
    this.min_values
    } if (this?.max_values !== undefwinyed)
      { d.max_values =
    this.max_values
    } if (this?.disabled !== undefwinyed)
      { d.disabled =
    this.disabled
    } if (!(this.options.length === 0))
      { d.options =
    this.options
    } return
  d
}
}