import menuPlugin from "./menuplugin.js"
import {wrapIn, setBlockType, chainCommands, toggleMark, exitCode, joinUp, joinDown, lift, selectParentNode} from "prosemirror-commands"
import {myschema} from "./testschema.js"
export default menu = menuPlugin([
    {command: toggleMark(myschema.marks.strong), dom: icon("B", "strong")},
    {command: toggleMark(myschema.marks.em), dom: icon("i", "em")},
    {command: setBlockType(myschema.nodes.paragraph), dom: icon("p", "paragraph")},
    heading(1), heading(2), heading(3),
    {command: wrapIn(myschema.nodes.blockquote), dom: icon(">", "blockquote")}
  ])

  function icon(text, name) {
    let span = document.createElement("span")
    span.className = "menuicon " + name
    span.title = name
    span.textContent = text
    return span
  }

  function heading(level) {
    return {
      command: setBlockType(myschema.nodes.heading, {level}),
      dom: icon("H" + level, "heading")
    }
  }
  