from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from backend.config import Config
from backend.models import db

migrate = Migrate()
jwt = JWTManager()
mail = Mail()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    mail.init_app(app)

    # Register blueprints
    from backend.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    from backend.stocks import stocks_bp
    app.register_blueprint(stocks_bp, url_prefix="/api")

    @app.route("/health")
    def health_check():
        return {"status": "ok", "message": "INSYS ENTERPRISE API is running"}

    @app.route("/")
    def serve_index():
        import os
        from flask import send_from_directory
        root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        return send_from_directory(root_dir, 'index.html')

    @app.route("/<path:path>")
    def serve_static(path):
        import os
        from flask import send_from_directory
        root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        if os.path.exists(os.path.join(root_dir, path)):
            return send_from_directory(root_dir, path)
        return {"error": "Not found"}, 404

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)

