    import {EditorState, TextSelection} from "prosemirror-state"
    import {EditorView} from "prosemirror-view"
    import {Schema, DOMParser, DOMSerializer} from "prosemirror-model"
    import {schema} from "./schema"
    import {addListNodes} from "prosemirror-schema-list"
    import {exampleSetup} from "./customSetup"
    import '../css/prose.css'
    import '../css/mystyles.scss'
    var pretty = require('pretty')
    // Mix the nodes from prosemirror-schema-list into the basic schema to
    // create a schema with list support.
    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
      marks: schema.spec.marks
    })
    
    window.view = new EditorView(document.querySelector("#editor"), {
      state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(document.querySelector("#content")),
        plugins: exampleSetup({schema: mySchema})
      })
    })

  
    let myt = document.querySelector("#mytext");
    document.getElementById("getbutton").addEventListener("click", function(){
      console.log(view.state.doc.content.size);
      const div = document.createElement('div')
      const fragment = DOMSerializer
        .fromSchema(mySchema)
        .serializeFragment(view.state.doc.content)
  
      div.appendChild(fragment)
      myt.value = pretty(div.innerHTML);
      div.remove();
    }); 
  
    document.getElementById("setbutton").addEventListener("click", function(){
      let newcontent = myt.value;
      const newdiv = document.createElement('div');
      newdiv.innerHTML = newcontent;
      const { doc, tr } = view.state;
      console.log(view.state.doc.content.size);
      const selection = TextSelection.create(doc, 0, doc.content.size);
      const transaction = tr
        .setSelection(selection)
        .replaceSelectionWith(DOMParser.fromSchema(mySchema).parse(newdiv, { preserveWhiteSpace: true }), false);
      let mkmk = view.state.apply(transaction);
      view.updateState(mkmk);
      console.log(view.state.doc.content.size);
    }); 
    