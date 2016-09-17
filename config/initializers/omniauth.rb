Rails.application.config.middleware.use OmniAuth::Builder do
  provider :github, ENV['GITHUB_REPO_KEY'], ENV['GITHUB_REPO_SECRET'], scope: "user,repo"
end