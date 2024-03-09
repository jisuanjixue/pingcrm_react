# Disable 'mutliline' support due to poor pasting performance
# see https://github.com/ruby/irb/issues/43
IRB.conf[:USE_MULTILINE] = false
IRB.conf[:ECHO_ON_ASSIGNMENT] = true
