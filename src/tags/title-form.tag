<title-form>
  <form onsubmit={ changeTitle }>
    <input type="text" ref="newTitle" placeholder="Type new title">
    <button type="submit">Change title</button>
    <button type="button" onclick={ resetTitle }>Reset</button>
  </form>

  <script>
    const actions = require('../actions.js')

    // it's good practice to declare ref aliases
    let newTitle

    this.on('mount', function() {
      newTitle = this.refs.newTitle
      newTitle.focus()
    })

    // need to call preventDefault for submit in Riot v3
    changeTitle(e) {
      e.preventDefault()

      if (!newTitle.value.length) {
        return false
      }

      opts.store.dispatch(actions.changeTitle(newTitle.value))

      // reset the value
      newTitle.value = ''
    }

    resetTitle() {
      opts.store.dispatch(actions.resetTitle())

      newTitle.value = ''
    }
  </script>
</title-form>
