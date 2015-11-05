SHELL := /bin/bash

ROOT_DIR := ./
PUBLIC_DIR := src/Aap/Bundle/AapSiteBundle/Resources/public

sass:
	@echo "Compile SASS"
	@cd $(PUBLIC_DIR) && sass --style=compact --update --force --scss --no-cache sass:css

bower:
	@echo "Install bower packages"
	@cd $(ROOT_DIR) && bower install

npm:
	@echo "Install node packages"
	@cd $(ROOT_DIR) && npm install

composer:
	@echo "Install composer packages"
	@cd $(ROOT_DIR) && composer install

setup: composer npm bower sass
	@echo "Setup done"

clean:
	rm -rf node_modules
	rm -rf src/Aap/Bundle/AapSiteBundle/Resources/public/vendor