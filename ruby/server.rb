require 'rubygems'
require 'base64'
require 'openssl'
require 'sinatra'

set :port, 3000

post '/' do
  request.body.rewind
  body = request.body.read

  puts
  puts body
  puts

  sent = env["HTTP_CRONOFY_HMAC_SHA256"]
  puts "Request HMAC:    #{sent}"

  digest = OpenSSL::Digest.new('sha256')
  calculated = Base64.encode64(OpenSSL::HMAC.digest(digest, ENV['CRONOFY_CLIENT_SECRET'], body)).strip
  puts "Calculated HMAC: #{calculated}"

  match = calculated == sent
  puts "Match: #{match}"
  puts
end
