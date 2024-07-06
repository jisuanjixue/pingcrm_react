class OrganizationsController < ApplicationController
  # Let CanCanCan load and authorize the instance variables
  load_and_authorize_resource
  before_action do
    Debugbar.msg("before_action", {params: params.permit!.to_h, callee: __callee__})
  end

  # @route GET /organizations (organizations)
  def index
    begin
      @q = Organization.ransack(params[:q])
      @organizations = @q.result(distinct: true).order(created_at: :desc)
      pagy, paged_organizations = pagy(@organizations)
    rescue Pagy::OverflowError
      pagy = Pagy.new(count: @organizations.count, page: params[:page], items: params[:items])
      paged_organizations = @organizations.offset(pagy.offset).limit(pagy.items)
    end

    render inertia: "Organizations/index",
      props: {
        # organizations: OrganizationSerializer.many(paged_organizations),
        organizations: paged_organizations.render,
        meta: pagy_metadata(pagy),
        total: @organizations.count,
      }
  end

  # @route GET /organizations/:id (organization)
  def show
    render inertia: "Organizations/show",
      props: {
        # organization: OrganizationWithContactsSerializer.one(@organization),
        organization: @organization.render(view: :show),
      }
  end

  # @route GET /organizations/:id/edit (edit_organization)
  def edit
    render inertia: "Organizations/edit",
      props: {
        organization: jbuilder { |json| json.call(@organization, :id, :name, :email, :phone, :address, :city, :region, :country, :postal_code, :deleted_at) },
        contacts: -> { jbuilder { |json| json.array! @organization.contacts.order_by_name, :id, :name, :phone, :city, :deleted_at } },
      }
  end

  # @route POST /organizations (organizations)
  def create
    if @organization.update(organization_params)
      redirect_to organizations_path, notice: "Organization created."
    else
      redirect_to organizations_path, inertia: { errors: @organization.errors }
    end
  end

  # @route PATCH /organizations/:id (organization)
  # @route PUT /organizations/:id (organization)
  def update
    if @organization.update!(organization_params)
      redirect_to organizations_path, notice: "Organization updated."
    else
      redirect_to organizations_path, inertia: { errors: @organization.errors }
    end
  end

  # @route DELETE /organizations/:id (organization)
  def destroy
    if @organization.destroy
      if can? :edit, @organization
        redirect_to organizations_path, notice: "Organization deleted."
      else
        redirect_to organizations_path, inertia: { errors: @organization.errors }
      end
    else
      redirect_to organizations_path, inertia: { errors: @organization.errors }
    end
  end

  # @route PUT /organizations/:id/restore (restore_organization)
  def restore
    if @organization.restore
      redirect_to edit_organization_path(@organization), notice: "Organization restored."
    else
      redirect_to edit_organization_path(@organization), alert: "Organization cannot be restored!"
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def organization_params
    params.fetch(:organization, {}).permit(:name, :email, :phone, :address, :city, :region, :country, :postal_code)
  end
end
