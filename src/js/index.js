import '../css/mystyles.scss';

import {schema} from "prosemirror-schema-basic"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {undo, redo, history} from "prosemirror-history"
import {keymap} from "prosemirror-keymap"
import {DOMParser} from "prosemirror-model"

let content = document.getElementById("content")

let state = EditorState.create({schema,
  doc: DOMParser.fromSchema(schema).parse(content),
  plugins: [
    history(),
    keymap({"Ctrl-z": undo, "Ctrl-y": redo})
  ]
})
let edx = document.querySelector("#myeditor")
let view = new EditorView(edx, {state,
  dispatchTransaction(transaction) {
    console.log("Document size went from", transaction.before.content.size,
                "to", transaction.doc.content.size)
    let newState = view.state.apply(transaction)
    view.updateState(newState)}
  })

const myArrowFunc = (a, b) => {
    if (a === void 0) return b;
    return a;
  };
  console.log('the page has loaded - 3');