<error-message>
  <div show={ state.isError }>
    { state.message } <a href="#" onclick={ hideMessage }>x</a>
  </div>

  <script>
    this.state = opts.state

    console.log('this.state', this.state)

    hideMessage() {
      opts.onhide()
    }
  </script>
</error-message>
