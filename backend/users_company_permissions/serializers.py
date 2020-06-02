from rest_framework import serializers

from .models import *

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['id', 'title', 'slug', 'company', 'description', 'permissions']
        model = Group

class UsersCompanyPermissionsSerializerDeep(serializers.ModelSerializer):
    class Meta:
        fields = ['id', 'user', 'company', 'group', 'phone', 'description', 'image', 'active']
        model = UsersCompanyPermissions
        depth = 1

class UsersCompanyPermissionsSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['id', 'user', 'company', 'group', 'phone', 'description', 'image', 'active']
        model = UsersCompanyPermissions

class GroupSerializerGetList(serializers.ModelSerializer):
    user_company_group_field = UsersCompanyPermissionsSerializerDeep(many=True)

    class Meta:
        fields = ['id', 'title', 'slug', 'company', 'description', 'permissions', 'user_company_group_field']
        model = Group

class GroupSerializerDeep(serializers.ModelSerializer):
    user_company_group_field = UsersCompanyPermissionsSerializer(many=True)

    class Meta:
        fields = ['id', 'title', 'slug', 'company', 'description', 'permissions', 'user_company_group_field']
        model = Group
    def create(self, validated_data):
        users_data = validated_data.pop('user_company_group_field')
        group = Group.objects.create(**validated_data)
        for user in users_data:
            userInstance = UsersCompanyPermissions.objects.get(**user)
            userInstance.group = group
            userInstance.save()
        return group
    def update(self, instance, validated_data):
        print(validated_data)
        users_data = validated_data.pop('user_company_group_field')
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.permissions = validated_data.get('permissions', instance.permissions)
        instance.save()

        old_group_users = UsersCompanyPermissions.objects.filter(group=instance.id)
        for user in old_group_users:
            user.group = None
            user.save()
        for user in users_data:
            updated_user = UsersCompanyPermissions.objects.get(**user)
            updated_user.group = instance
            updated_user.save()

        return instance
