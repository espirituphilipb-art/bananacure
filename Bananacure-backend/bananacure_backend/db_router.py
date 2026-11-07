class SecondaryDBRouter:
    """Routes specific app models to PC-B database."""
    route_app_labels = {'core'}  # Replace with app names for PC-B

    def db_for_read(self, model, **hints):
        if model._meta.app_label in self.route_app_labels:
            return 'pc_b_db'
        return 'default'

    def db_for_write(self, model, **hints):
        if model._meta.app_label in self.route_app_labels:
            return 'pc_b_db'
        return 'default'

    def allow_relation(self, obj1, obj2, **hints):
        return True

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label in self.route_app_labels:
            return db == 'pc_b_db'
        return db == 'default'