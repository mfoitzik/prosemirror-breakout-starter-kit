export default class MenuView {
    constructor(items, editorView) {
      this.items = items
      this.editorView = editorView
        console.log('I am being cobstructed')
      this.dom = document.createElement("div")
      this.dom.className = "menubar"
      items.forEach(({dom}) => this.dom.appendChild(dom))
      this.update()
  
      this.dom.addEventListener("mousedown", e => {
        e.preventDefault()
        editorView.focus()
        items.forEach(({command, dom}) => {
          if (dom.contains(e.target))
            command(editorView.state, editorView.dispatch, editorView)
        })
      })
    }
  
    update() {
      this.items.forEach(({command, dom}) => {
        let active = command(this.editorView.state, null, this.editorView)
        dom.style.display = active ? "" : "none"
      })
    }
  
    destroy() { this.dom.remove() }
  }