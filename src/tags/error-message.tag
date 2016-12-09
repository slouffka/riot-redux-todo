<error-message>
  <div show={ opts.iserror }>
    { opts.message } <a href="#" onclick={ hideMessage }>x</a>
  </div>

  <script>
    hideMessage() {
      opts.onhide()
    }
  </script>
</error-message>
