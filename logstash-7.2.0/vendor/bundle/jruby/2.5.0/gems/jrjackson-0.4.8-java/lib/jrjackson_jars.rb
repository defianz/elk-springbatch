# this is a generated file, to avoid over-writing it just delete this comment
begin
  require 'jar_dependencies'
rescue LoadError
  require 'com/fasterxml/jackson/core/jackson-databind/2.9.7/jackson-databind-2.9.7.jar'
  require 'com/fasterxml/jackson/module/jackson-module-afterburner/2.9.7/jackson-module-afterburner-2.9.7.jar'
  require 'com/fasterxml/jackson/core/jackson-core/2.9.7/jackson-core-2.9.7.jar'
  require 'com/fasterxml/jackson/core/jackson-annotations/2.9.7/jackson-annotations-2.9.7.jar'
end

if defined? Jars
  require_jar 'com.fasterxml.jackson.core', 'jackson-databind', '2.9.7'
  require_jar 'com.fasterxml.jackson.module', 'jackson-module-afterburner', '2.9.7'
  require_jar 'com.fasterxml.jackson.core', 'jackson-core', '2.9.7'
  require_jar 'com.fasterxml.jackson.core', 'jackson-annotations', '2.9.7'
end
