SHELL := /bin/bash

PWD := $(shell pwd)
PUBLIC_DIR := $(PWD)/src/Aap/Bundle/AapSiteBundle/Resources/public

sass:
	@echo "Compile SASS"
	@cd $(PUBLIC_DIR) && sass --style=compact --update --force --scss --no-cache sass:css

bower:
	@echo "Install bower packages"
	@$(PWD)/node_modules/bower/bin/bower install

npm:
	@echo "Install node packages"
	@cd $(PWD) && npm install

composer:
	@echo "Install composer packages"
	@cd $(PWD) && composer install

typescript:
	@echo "Compile typescript"
	@$(PWD)/node_modules/typescript/bin/tsc --project src/Aap/Bundle/AapSiteBundle/Resources/ts

setup: composer npm bower sass typescript
	@echo "Setup done"

clean:
	rm -rf node_modules
	rm -rf src/Aap/Bundle/AapSiteBundle/Resources/public/vendor