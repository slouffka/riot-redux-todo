<sample-output>
  <h1>{ opts.store.getState().title }</h1>

  <script>
    opts.store.subscribe(function() {
      this.update()
    }.bind(this))
  </script>
</sample-output>
