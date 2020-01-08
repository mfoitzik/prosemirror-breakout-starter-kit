import '../css/mystyles.scss';

//import {schema} from "prosemirror-schema-basic"
import {myschema} from "./testschema.js"
import {EditorState, TextSelection} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {undo, redo, history} from "prosemirror-history"
import {keymap} from "prosemirror-keymap"
import {DOMParser, DOMSerializer} from "prosemirror-model"
import {wrapIn, setBlockType, chainCommands, toggleMark, exitCode, joinUp, joinDown, lift, selectParentNode} from "prosemirror-commands"
import {baseKeymap} from "prosemirror-commands"

let content = document.getElementById("content")

let state = EditorState.create({myschema,
  doc: DOMParser.fromSchema(myschema).parse(content),
  plugins: [
    history(),
    keymap({"Ctrl-z": undo, 
    "Ctrl-y": redo, 
    "Ctrl-b": toggleMark(myschema.marks.strong),
    "Ctrl-i": toggleMark(myschema.marks.em)
  }),
    keymap(baseKeymap)
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
  console.log('the page has loaded - 4');
  let myt = document.querySelector("#mytext");
  document.getElementById("mybutton").addEventListener("click", function(){
    console.log(view.state.doc.content.size);
    const div = document.createElement('div')
    const fragment = DOMSerializer
      .fromSchema(myschema)
      .serializeFragment(view.state.doc.content)

    div.appendChild(fragment)
    myt.value = div.innerHTML;
    div.remove();
  }); 

  document.getElementById("setbutton").addEventListener("click", function(){
    let newcontent = myt.value;
    const newdiv = document.createElement('div');
    newdiv.innerHTML = newcontent;
    //console.log(view.dispatch);
    //below line "works"
    //view.dispatch(state.tr.insertText("kpkpk"));
    //let mysel = new state.TextSelection(1, 2);
    //view.dispatch(state.tr.replaceSelectionWith(DOMParser.fromSchema(schema).parse(newdiv)));
    //view.state.doc.content = DOMParser.fromSchema(schema).parse(newdiv);


    //from tip
    const { doc, tr } = view.state;
    console.log(view.state.doc.content.size);
    //const document = this.createDocument(content, parseOptions)
    const selection = TextSelection.create(doc, 0, doc.content.size);
    const transaction = tr
      .setSelection(selection)
      .replaceSelectionWith(DOMParser.fromSchema(myschema).parse(newdiv), false);
    //let mkmk = view.dispatch(transaction);
    let mkmk = view.state.apply(transaction);
    view.updateState(mkmk);
    console.log(view.state.doc.content.size);
  }); 