.PHONY: help worker ui dev preview install

# Config
UI_DIR ?= website
UI_PORT ?= 5173
WORKER_PORT ?= 8788

help:
	@echo "Targets:"
	@echo "  make dev        🚀 Run full stack (Wrangler + Vite Proxy)"
	@echo "  make worker     🔧 Run Wrangler (GoCardless Functions) only"
	@echo "  make ui         🎨 Run Vite UI only"
	@echo "  make install    📦 Install all dependencies"

install:
	@npm install
	@cd "$(UI_DIR)" && npm install

ui:
	@cd "$(UI_DIR)" && npm run dev -- --port "$(UI_PORT)"

# Get today's date for the compatibility flag
COMPAT_DATE ?= $(shell date +%Y-%m-%d)

worker:
	@npx wrangler pages dev "$(UI_DIR)/public" \
		--port "$(WORKER_PORT)" \
		--compatibility-date="$(COMPAT_DATE)" \
		--compatibility-flags="nodejs_compat"

dev:
	@echo "Starting Wrangler (API) on port $(WORKER_PORT)..."
	@npx wrangler pages dev "$(UI_DIR)/public" \
		--port "$(WORKER_PORT)" \
		--compatibility-date="$(COMPAT_DATE)" \
		--compatibility-flags="nodejs_compat" & \
	WRANGLER_PID=$$!; \
	trap "kill $$WRANGLER_PID 2>/dev/null" EXIT INT TERM; \
	until curl -s http://localhost:$(WORKER_PORT) > /dev/null; do sleep 0.5; done; \
	echo "✅ Wrangler ready — starting Vite on port $(UI_PORT)"; \
	cd "$(UI_DIR)" && npm run dev -- --port "$(UI_PORT)"

preview:
	@cd "$(UI_DIR)" && npm run build
	@npx wrangler pages dev "$(UI_DIR)/dist" --compatibility-flags="nodejs_compat"
