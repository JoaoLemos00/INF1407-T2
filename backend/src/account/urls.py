from django.urls import path
from account.views import(
    
    registration_view,
    account_properties_view,
    update_account_view,
    ObtainAuthTokenView,
    logout_view,
    delete_account,

)

app_name = "account"

urlpatterns = [
    path('register', registration_view, name="register"),
    path('login', ObtainAuthTokenView.as_view(), name="login"),
    path('logout', logout_view, name='logout'),
    path('properties', account_properties_view, name="properties"),
    path('properties/update', update_account_view, name="update"),
    path('properties/delete-account/', delete_account, name='account-delete'),
]
