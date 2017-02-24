VERSION=0.0.1

build:
	@npm install
	@NODE_ENV=pre ./node_modules/.bin/gulp build

docker: build
	@docker build -t mancas:joseweb_$(VERSION) .

