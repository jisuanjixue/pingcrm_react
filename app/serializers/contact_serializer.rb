class ContactSerializer < BaseSerializer
attributes(
:id,
:address,
:city,
:country,
:deleted_at,
:email ,
:first_name,
:last_name,
:phone,
:postal_code,
:region,
:created_at,
:updated_at,
:account_id,
:organization_id
)
end