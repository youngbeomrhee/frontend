import React, {useState} from "react";

export function SearchForm({value, onSearch}) {
  return (
    <section>
      <input type='text' value={value} onChange={e => onSearch(e.target.value)} />
    </section>
  )
}