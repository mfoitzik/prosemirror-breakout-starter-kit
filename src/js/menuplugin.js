import {Plugin} from "prosemirror-state"
import MenuView from "./menuView.js"

export default function menuPlugin(items) {
    //console.log(items)
    return new Plugin({
    view(editorView) {
      console.log('before construction')
        let menuView = new MenuView(items, editorView)
      editorView.dom.parentNode.insertBefore(menuView.dom, editorView.dom)
      return menuView
    }
  })
}