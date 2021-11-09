from django.contrib.auth.models import User, Group

admin_group = Group(name='admin')
admin_group.save()


admin_user = User(username='admin', email='ander.ballesteros98@gmail.com', is_superuser=True)
admin_user.set_password("admin")
admin_user.save()

admin_group.user_set.add(admin_user)
