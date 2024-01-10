class ContactsController < ApplicationController
  # Let CanCanCan load and authorize the instance variables
  load_and_authorize_resource

  def index
      begin
      @q = Contact.ransack(params[:q])
      @contacts = @q.result(distinct: true)
      pagy, paged_contacts = pagy(@contacts)
    rescue Pagy::OverflowError
      pagy = Pagy.new(count: @contacts.count, page: params[:page], items: params[:items])
      paged_contacts = @contacts.offset(pagy.offset).limit(pagy.items)
    end

    render inertia: 'Contacts/index', props: {
      contacts: jbuilder do |json|
        json.data(paged_contacts.includes(:organization)) do |contact|
          json.(contact, :id, :name, :phone, :city, :deleted_at)
          json.organization(contact.organization, :name) if contact.organization
        end
        json.meta pagy_metadata(pagy)
      end,

      total: @contacts.count
    }
  end

  def new
    render inertia: 'Contacts/New', props: {
      organizations: -> {
        jbuilder do |json|
          json.array! current_user.organizations.order(:name), :id, :name
        end
      }
    }
  end

  def edit
    render inertia: 'Contacts/Edit', props: {
      contact: jbuilder do |json|
        json.(@contact, :id, :first_name, :last_name, :organization_id, :email, :phone, :address, :city, :region, :country, :postal_code, :deleted_at)
      end,
      organizations: -> {
        jbuilder do |json|
          json.array! current_user.organizations.order(:name), :id, :name
        end
      }
    }
  end

  def create
    if @contact.update(contact_params)
      redirect_to contacts_path, notice: 'Contact created.'
    else
      redirect_to new_contact_path, inertia: { errors: @contact.errors }
    end
  end

  def update
    if @contact.update!(contact_params)
      redirect_to contacts_path, notice: 'Contact updated.'
    else
      redirect_to edit_contact_path(@contact), inertia: { errors: @contact.errors }
    end
  end

  def destroy
    if @contact.soft_delete
      if can? :edit, @contact
        redirect_to edit_contact_path(@contact), notice: 'Contact deleted.'
      else
        redirect_to contacts_path, notice: 'Contact deleted.'
      end
    else
      redirect_to edit_contact_path(@contact), alert: 'Contact cannot be deleted!'
    end
  end

  def restore
    if @contact.restore
      redirect_to edit_contact_path(@contact), notice: 'Contact restored.'
    else
      redirect_to edit_contact_path(@contact), alert: 'Contact cannot be restored!'
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def contact_params
    params.fetch(:contact, {}).permit(
      :organization_id, :first_name, :last_name, :email, :phone, :address, :city,
      :region, :country, :postal_code
    )
  end
end
